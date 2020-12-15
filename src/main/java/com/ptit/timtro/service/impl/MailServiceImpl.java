package com.ptit.timtro.service.impl;

import com.ptit.timtro.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendCodeToMail(String mailReceive, String code) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, false, StandardCharsets.UTF_8.name());
            message.setTo(mailReceive);
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
            message.setText(contentMail, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendForgetAccount(String mailReceive, String username, String password) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, false, StandardCharsets.UTF_8.name());
            message.setTo(mailReceive);
            message.setSubject("Nhà Trọ Tốt gửi mail xác nhận tài khoản");
            String contentMail =
                    "<p>Ch&agrave;o bạn,</p>\n" +
                            "<p><em><strong>NhaTroTot </strong></em>gửi t&agrave;i khoản cho bạn.</p>\n" +
                            "<p>Đ&acirc;y l&agrave; th&ocirc;ng tin t&agrave;i khoản.</p>\n" +
                            "<ol>\n" +
                            "<li>T&ecirc;n đăng nhập: <em><strong>" + username + "</strong></em></li>\n" +
                            "<li>Mật khẩu: <em><strong>" + password + "</strong></em></li>\n" +
                            "</ol>\n" +
                            "<p>H&atilde;y x&aacute;c nhận để k&iacute;ch hoạt t&agrave;i khoản.</p>\n" +
                            "<p>Nếu bạn cần tư vấn c&oacute; thể li&ecirc;n hệ trực tiếp tới:</p>\n" +
                            "<ol>\n" +
                            "<li>Hotline:&nbsp;<strong><em>0352464242&nbsp;</em></strong></li>\n" +
                            "<li>Mail:&nbsp;<em><strong><a href=\"mailto:nhatrotot.main@gmail.com\" target=\"_blank\" rel=\"noopener\">nhatrotot.main@gmail.com</a></strong></em></li>\n" +
                            "</ol>\n" +
                            "<p>Cảm ơn.</p>";
            message.setText(contentMail, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
