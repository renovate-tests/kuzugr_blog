# frozen_string_literal: true

class ContactMailer < ActionMailer::Base
  def send_contact(params)
    @content = "#{params[:name]}\n\n#{params[:content]}\n\n#{params[:email]}"
    mail(
      subject: Settings.mail.contact.title,
      to: ENV['KUZUGR_EMAIL'],
      from: ENV['KUZUGR_EMAIL']
    ) do |format|
      format.text
    end
  end
end