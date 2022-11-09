package com.nt.rookie.post.util;

public class ConvertLanguage {
    public ConvertLanguage() {
    }
    String convertString(String input) {
        char a = input.charAt(0);
        input = input.substring(1);

        switch (a){
            case 'Ă':
                return "a" + input;
            case 'Â':
                return "a" + input;
            case 'Đ':
                return "d" + input;
            case 'Ê':
                return "e" + input;
            case 'Ô':
                return "o" + input;
            case 'Ơ':
                return "o" + input;
            case 'ă':
                return "a" + input;
            case 'â':
                return "a" + input;
            case 'đ':
                return "d" + input;
            case 'ê':
                return "e" + input;
            case 'ô':
                return "o" + input;
            case 'ơ':
                return "o" + input;

            default:
                return a + input;
        }
    }
    char convertChar(char input) {
        switch (input){
            case 'Ă':
                return 'a';
            case 'Â':
                return 'a';
            case 'Đ':
                return 'd';
            case 'Ê':
                return 'e';
            case 'Ô':
                return 'o';
            case 'Ơ':
                return 'o';
            case 'ă':
                return 'a';
            case 'â':
                return 'a';
            case 'đ':
                return 'd';
            case 'ê':
                return 'e';
            case 'ô':
                return 'o';
            case 'ơ':
                return 'o';

            default:
                return input;
        }
    }
}
