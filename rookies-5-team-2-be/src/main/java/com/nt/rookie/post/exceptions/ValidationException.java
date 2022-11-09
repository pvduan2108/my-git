package com.nt.rookie.post.exceptions;

public class ValidationException extends RuntimeException{
  public ValidationException() {}
  public ValidationException(Throwable cause) {
    super(cause);
  }
  public ValidationException(String msg) {
    super(msg);
  }
}
