# paths
app_path = File.expand_path('../', File.dirname(__FILE__))

# listen
listen 3000

# logging
unless STDIN.tty?
  pid_dir ="#{app_path}/tmp/pids"
  FileUtils.mkdir_p(pid_dir) unless File.exists?(pid_dir)
  pid "#{app_path}/tmp/pids/unicorn.pid"

  stderr_path "log/unicorn.stderr.log"
  stdout_path "log/unicorn.stdout.log"

  # workers
  cpus = (`uname`.chomp == 'Darwin' ? `sysctl hw.ncpu|cut -d' ' -f2` : `nproc`).to_i
  cpu_coefficient = 2.2
  worker_processes (cpus * cpu_coefficient).floor
end

# use correct Gemfile on restarts
before_exec do |_server|
  ENV['BUNDLE_GEMFILE'] = "#{app_path}/Gemfile"
end

# preload
preload_app true

before_fork do |server, worker|
  # the following is highly recomended for Rails + "preload_app true"
  # as there's no need for the master process to hold a connection
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.connection.disconnect!
  end

  # Before forking, kill the master process that belongs to the .oldbin PID.
  # This enables 0 downtime deploys.
  old_pid = "#{server.config[:pid]}.oldbin"
  if File.exists?(old_pid) && server.pid != old_pid
    begin
      Process.kill("QUIT", File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
      # someone else did our job for us
    end
  end
end

after_fork do |server, worker|
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.establish_connection
  end
end
