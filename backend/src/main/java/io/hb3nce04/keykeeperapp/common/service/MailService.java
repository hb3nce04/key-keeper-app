package io.hb3nce04.keykeeperapp.common.service;

import java.util.Map;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

/**
 * Felelős a HTML alapú e-mailek küldéséért.
 */
@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public void send(String to, String subject, String template, Map<String, Object> variables) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();
            context.setVariables(variables);
            String html = templateEngine.process(template, context);

            helper.setTo(to);
            helper.setSubject(String.format("Kulcsnyilvántartó rendszer - %s", subject));
            helper.setText(html, true);
            helper.setFrom("app@keykeeper.io");

            mailSender.send(message);
        } catch (MessagingException ex) {
            System.out.println("Hiba történt az e-mail küldése során: " + ex.getMessage());
        }
    }
}
