package com.ptit.timtro.config;

import com.ptit.timtro.model.Payment;
import com.ptit.timtro.service.PaymentService;
import com.ptit.timtro.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class Scheduler {

    @Autowired
    private PostService postService;

    @Autowired
    private PaymentService paymentService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void resetPosstPayment() throws Exception {
        Date date = new Date();
        Timestamp currentTime = new Timestamp(date.getTime());
        List<Integer> paymentIDList = new ArrayList<>();
        List<Integer> postIDList = new ArrayList<>();
        List<Payment> paymentList = paymentService.getEnablePost(currentTime);
        for (Payment p : paymentList) {
            paymentIDList.add(p.getId());
            postIDList.add(p.getPost().getId());
        }
        for (Integer postID : postIDList) {
            (new Thread(() -> postService.updateStatus(postID, false))).start();
        }
        for (Integer paymentID : paymentIDList) {
            (new Thread(() -> paymentService.updateStatusById(paymentID, false))).start();
        }
    }

//    @Scheduled(cron = "*/10 * * * * *")
//    public void test() throws Exception {
//        Date date = new Date();
//        Timestamp currentTime = new Timestamp(date.getTime());
//        System.out.println(currentTime);
//        List<Integer> paymentIDList = new ArrayList<>();
//        List<Integer> postIDList = new ArrayList<>();
//        List<Payment> paymentList = paymentService.getEnablePost(currentTime);
//        for (Payment p : paymentList) {
//            paymentIDList.add(p.getId());
//            postIDList.add(p.getPost().getId());
//        }
//        for (Integer postID : postIDList) {
//            (new Thread(() -> postService.updateStatus(postID, false))).start();
//        }
//        for (Integer paymentID : paymentIDList) {
//            (new Thread(() -> paymentService.updateStatusById(paymentID, false))).start();
//        }
//    }
}


//"0 0 * * * *" // Đầu giờ của tất cả các giờ của tất cả các ngày.
//
//        "*/10 * * * * *" // Mỗi 10 giây (số giây chia hết cho 10).
//
//        "0 0 8-10 * * *" // 8, 9 và 10 giờ các ngày
//
//        "0 0/30 8-10 * * *" // 8:00, 8:30, 9:00, 9:30 và 10 tất cả các ngày
//
//        "0 0 9-17 * * MON-FRI" // 9, .. 17 giờ các ngày thứ 2 tới thứ 6 (monday & friday)
//
//        "0 0 0 25 12 ?" // Tất cả các ngày giáng sinh, nửa đêm.
