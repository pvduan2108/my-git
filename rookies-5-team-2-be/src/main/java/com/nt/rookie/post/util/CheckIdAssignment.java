package com.nt.rookie.post.util;

public class CheckIdAssignment {
    public static boolean checkIdAssignment(Integer[] arr, int toCheckValue)
    {
        // check if the specified element
        // is present in the array or not
        // using Linear Search method
        boolean test = false;
        for (int element : arr) {
            if (element == toCheckValue) {
                test = true;
                toCheckValue++;
                break;
            }
        }

        return test;
    }
}
