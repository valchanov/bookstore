package com.bookstore.bookinfoservice.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Order(0)
public class BookAspect {

    //all methods in BookCtrl
    @Pointcut("execution(public * com.bookstore.bookinfoservice.controller.BookCtrl.*(..))")
    void controllerRequest() {}

    //execute before controllerRequest
    @Before("controllerRequest()")
    public void beforeAdvice(JoinPoint joinPoint) {
        System.out.println("Before advice executed");
    }

    //execute after controllerRequest
    @After("controllerRequest()")
    public void afterAdvice(JoinPoint joinPoint) {
        System.out.println("After advice executed");
    }

    //Using Aspect to method marked with @Loggable
    @Before("@annotation(com.bookstore.bookinfoservice.aspect.Loggable)")
    public void myAdvice(){
        System.out.println("Logging some info");
    }
}
