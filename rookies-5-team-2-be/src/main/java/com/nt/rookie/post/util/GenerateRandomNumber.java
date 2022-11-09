package com.nt.rookie.post.util;

import java.util.Random;

public class GenerateRandomNumber {
    public static int getRandomNumber(int number){
        Random rand = new Random();
        int upperbound = number;
        int int_random = rand.nextInt(upperbound);
        return int_random;
    }
}
