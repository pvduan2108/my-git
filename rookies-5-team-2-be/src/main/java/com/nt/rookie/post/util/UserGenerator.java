package com.nt.rookie.post.util;

import com.nt.rookie.post.dto.UserDto;

import java.text.DateFormat;
import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class UserGenerator {

    /**
     * Return string converted from given date
     * @param date date to convert to String
     * @return {@link String}
     */
    private String dateFormat(Date date) {
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        return dateFormat.format(date);
    }

    /**
     * Verify dateOfBirth (At least 18 years till now)
     * @param date given dateOfBirth
     * @see #dateFormat(Date)             
     * @throws ParseException if can not parse the date
     * @return {@link Boolean}
     */
    private boolean verifyDateOfBirth(Date date) throws ParseException {
        Date thisDay = Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date dateOfBirth = new SimpleDateFormat("yyyy-MM-dd").parse(dateFormat(date));
        if (((thisDay.getTime() - dateOfBirth.getTime()) / (1000l * 60 * 60 * 24 * 365) < 18)) {
            return false;
        }
        return true;
    }
    /**
     * Verify joinedDate (Must be after dateOfBirth)
     * @param birthDate dateOfBirth
     * @param joinedDate joinedDate
     * @return {@link Boolean}
     */
    private boolean verifyJoinedDate(Date birthDate, Date joinedDate) {
        return joinedDate.getTime() - birthDate.getTime() > 0;
    }

    /**
     * Generate staff code
     * @param number number of existing users in database
     * @return {@link String}
     */
    private String staffCodeGen(int number) {
        int check = number;
        int count = 0;
        while (check > 0) {
            check /= 10;
            count ++;
        }
        String staffCode = "SD";
        for (int i = 0; i < 4 - count; i++) {
            staffCode += "0";
        }
        staffCode += Integer.toString(number + 1);
        return staffCode;
    }
    /**
     * Generate username
     * @param firstName user's firstName
     * @param lastName user's lastName
     * @return {@link String}
     */
    public String usernameGen(String firstName, String lastName) {
        List<String> splitFirstList = Arrays.stream(firstName.split("\\s")).filter(s -> !s.equals("")).collect(Collectors.toList());
        if (splitFirstList.size() > 1 || firstName.length() > 50 || lastName.length() > 50) {
            return null;
        }
        String a = Normalizer.normalize(firstName, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String username = pattern.matcher(a).replaceAll("");
        username = new ConvertLanguage().convertString(username).toLowerCase();
        List<String> splitLastList = Arrays.stream(lastName.split("\\s")).filter(s -> !s.equals("")).collect(Collectors.toList());
        for (int i = 0; i < splitLastList.size(); i++) {
            username += new ConvertLanguage().convertChar(splitLastList.get(i).toLowerCase().charAt(0));
        }
        return username;
    }
    /**
     * Generate password
     * @param username user's username
     * @param birthDate user's dateOfBirth
     * @return {@link String}
     */
    private String passwordGen(String username, Date birthDate){
        String dateInString = dateFormat(birthDate);
        String mock = username + "@";
        String[] list = dateInString.split("-");
        for (int i = 0; i < list.length; i++) {
            mock += list[i];
        }
        return new BcryptPassword().passwordEncoding(mock);
    }
    /**
     * Generate user dto for new user
     * @param mockUser userDto from frontend
     * @param number number of existing users in database
     * @param username new user's username
     * @see #usernameGen(String, String) 
     * @see #passwordGen(String, Date) 
     * @see #verifyDateOfBirth(Date) 
     * @see #verifyJoinedDate(Date, Date) 
     * @throws ParseException if can not parse the date
     * @return {@link UserDto}
     */
    public UserDto newUser(UserDto mockUser, int number, String username) throws ParseException {
        if (!verifyDateOfBirth(mockUser.getBirthDate())) {
            return null;
        }
        if (!verifyJoinedDate(mockUser.getBirthDate(), mockUser.getJoinedDate())) {
            return null;
        }

        UserDto theNewOne = mockUser;
        theNewOne.setUsername(username);
        theNewOne.setStaffCode(staffCodeGen(number));
        theNewOne.setPassword(passwordGen(username, theNewOne.getBirthDate()));
        return theNewOne;
    }
}
