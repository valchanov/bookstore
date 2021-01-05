package com.bookstore.bookinfoservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class BookCtrlTest {
    @Autowired
    ObjectMapper mapper;

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac)
                                      .build();
    }

    @Test
    void getMe() throws Exception {
        mockMvc.perform(get("/books/{id}", 1L))
               .andExpect(status().isOk())
               .andDo(print())
               .andExpect(header().string("Content-Type", "application/json"))
               .andExpect(content().string(containsString("Jane Austen")))
               .andExpect(content().string(containsString("Pride and Prejudice")));
    }
}