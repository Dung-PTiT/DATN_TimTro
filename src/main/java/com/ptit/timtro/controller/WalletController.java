package com.ptit.timtro.controller;

import com.ptit.timtro.model.TopUpHistory;
import com.ptit.timtro.model.Wallet;
import com.ptit.timtro.service.TopUpHistoryService;
import com.ptit.timtro.service.WalletService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class WalletController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private TopUpHistoryService topUpHistoryService;

    @PostMapping("/wallet/update")
    public DataResponse<String> topUp(@RequestParam("balance") Integer balance,
                                               @RequestParam("walletId") Integer walletId) {
        try {
            Wallet wallet = walletService.getById(walletId);
            Integer newBalance = wallet.getBalance() + balance;
            wallet.setBalance(newBalance);
            walletService.update(wallet);

            TopUpHistory topUpHistory = new TopUpHistory();
            topUpHistory.setBalance(balance);
            topUpHistory.setCreateTime(new Date());
            topUpHistory.setWallet(wallet);
            topUpHistoryService.create(topUpHistory);

            return new DataResponse<>(true, "Nạp tiền thành công");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Lỗi");
    }

    @GetMapping("/wallet/get-by-wallet-id")
    public DataResponse<List<TopUpHistory>> getTopUpHistoryByWalletId(@RequestParam("walletId") Integer walletId) {
        try {
            return new DataResponse<>(true,topUpHistoryService.getByWalletId(walletId));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }

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
