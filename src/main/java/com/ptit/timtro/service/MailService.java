package com.ptit.timtro.service;

public interface MailService {
    void sendCodeToMail(String mailReceive, String code);

    void sendForgetAccount(String mailReceive, String username, String password);
}
