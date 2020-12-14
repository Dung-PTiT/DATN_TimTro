package com.ptit.timtro.service.impl;

import com.ptit.timtro.service.MailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class MailServiceImpl implements MailService {

    private static final String CONTENT_TYPE_TEXT_HTML = "text/html;charset=\"utf-8\"";
    @Value("${config.mail.host}")
    private String host;
    @Value("${config.mail.port}")
    private String port;
    @Value("${config.mail.username}")
    private String email;
    @Value("${config.mail.password}")
    private String password;

    @Override
    public void sendMail(String mailReceive, String code) {
        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props,
                new Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(email, password);
                    }
                });
        Message message = new MimeMessage(session);
        try {
            message.setRecipients(Message.RecipientType.TO, new InternetAddress[]{new InternetAddress(mailReceive)});

            message.setFrom(new InternetAddress(email));
            message.setSubject("Nhà Trọ Tốt gửi mail xác nhận tài khoản");

            String contentMail =
                    "<p>Ch&agrave;o bạn,</p>\n" +
                            "<p><span style=\"color: #000000;\"><em><strong>NhaTroTot </strong></em></span>rất vui khi c&oacute; sự tham <span style=\"color: #000000;\">gia </span>của bạn.</p>\n" +
                            "<p>Đ&acirc;y l&agrave; đoạn m&atilde; để x&aacute;c nhận t&agrave;i khoản.</p>\n" +
                            "<h2 style=\"text-align: left; padding-left: 40px;\"><strong>" + code + "</strong></h2>\n" +
                            "<p>H&atilde;y x&aacute;c nhận để k&iacute;ch hoạt t&agrave;i khoản.</p>\n" +
                            "<p>Nếu bạn cần tư vấn c&oacute; thể li&ecirc;n hệ trực tiếp tới:</p>\n" +
                            "<ol>\n" +
                            "<li>Hotline: <strong><em>0352464242&nbsp;</em></strong></li>\n" +
                            "<li>Mail: <em><strong>nhatrotot.main@gmail.com</strong></em></li>\n" +
                            "</ol>\n" +
                            "<p>Cảm ơn.</p>\n" +
                            "<p>&nbsp;</p>";

            message.setContent(contentMail, CONTENT_TYPE_TEXT_HTML);
            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
