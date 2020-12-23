package com.ptit.timtro.controller;

import com.ptit.timtro.model.Wallet;
import com.ptit.timtro.service.WalletService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping("/wallet/get-all")
    public DataResponse<List<Wallet>> getAllWallets() {
        try {
            return new DataResponse<>(true, walletService.getAll());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }
}
