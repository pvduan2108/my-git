package com.nt.rookie.post.mapper;

public class AssetStateMapper {

    public static int toInt (String str){
        switch (str) {
            case "Available": return 0;
            case "Not Available": return 1;
            case "Waiting for Recycling": return 2;
            case "Assigned": return 3;
            case "Recycled": return 4;
            default:return -1;
        }
    }
    public static String toString(Integer s) {
        switch (s) {
            case 0: return "Available";
            case 1: return "Not Available";
            case 2: return "Waiting for Recycling";

            case 3: return "Assigned";
            case 4: return "Recycled";
            default:return "Invalid state";
        }
    }
}
