package com.nt.rookie.post.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.nt.rookie.post.util.JwtTokenUtil;
import com.nt.rookie.post.model.JwtRequest;
import com.nt.rookie.post.model.JwtResponse;
import com.nt.rookie.post.service.impl.JwtUserDetailsService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final SystemUser loggedUser = userDetailsService.findUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        final String authority = userDetails.getAuthorities().stream().findFirst().get().toString();
        final String locationCode = loggedUser.getLocation().getLocationCode();
        return ResponseEntity.ok(new JwtResponse(token, authority, loggedUser.getFirstTime(), locationCode));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @CrossOrigin
    @PostMapping("/change")
    public ResponseEntity<String> changePassword(@RequestBody ObjectNode objectNode) {
        String username = objectNode.get("username").asText();
        String pw = objectNode.get("password").asText();
        return new ResponseEntity<>(userService.changePassword(username, pw), HttpStatus.OK);
    }

    //change password option
    @CrossOrigin
    @PostMapping("/changeoption")
    public ResponseEntity<String> changePasswordOption(@RequestBody ObjectNode objectNode) {
        String username = objectNode.get("username").asText();
        String pw = objectNode.get("password").asText();
        int result = this.userService.changePasswordOption(username, pw);
        if (result == 0) {
            return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Change password success", HttpStatus.OK);
    }
}
