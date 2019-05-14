if Rails.env.test?
  Aws.config.update({
    credentials: Aws::Credentials.new('access-key', 'secret-key'),
    region: "ap-northeast-1",
    endpoint: 'http://localhost:10001/',
    force_path_style: true
  })
end