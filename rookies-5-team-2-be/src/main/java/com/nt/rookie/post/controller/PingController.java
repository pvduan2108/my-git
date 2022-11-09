package com.nt.rookie.post.controller;

import com.nt.rookie.post.dto.PongMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingController {

    @GetMapping("/ping")
    public ResponseEntity<PongMessage> getPong() {
        return new ResponseEntity<>(new PongMessage("Hello Rookies"), HttpStatus.OK);
    }

}
