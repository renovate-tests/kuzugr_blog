# frozen_string_literal: true

class CommentMailer < ActionMailer::Base
  def send_comment_mail(params)
    @content = "#{params[:content]}\n\n#{params[:name]}"
    mail(
      subject: Settings.mail.comment.title,
      to: ENV['KUZUGR_EMAIL'],
      from: ENV['KUZUGR_EMAIL']
    ) do |format|
      format.text
    end
  end
end