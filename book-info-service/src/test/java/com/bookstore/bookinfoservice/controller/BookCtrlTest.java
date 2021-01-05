package com.bookstore.bookinfoservice.controller;

import com.bookstore.bookinfoservice.model.Book;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.File;
import java.math.BigDecimal;
import java.util.List;

import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith( { RestDocumentationExtension.class })
@AutoConfigureRestDocs(outputDir = "target/generated-snippets")
@SpringBootTest
@Sql( { "/delete.sql", "/test-data.sql" })
class BookCtrlTest {
    @Autowired
    ObjectMapper mapper;

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(RestDocumentationContextProvider restDocumentation) {

        this.mockMvc = MockMvcBuilders
            .webAppContextSetup(wac)
            .apply(documentationConfiguration(restDocumentation))
            .build();
    }

    @Test
    void getAllBooks() throws Exception {
        List<Book> books = mapper.readValue(new File("src/test/resources/books.json"), List.class);

        mockMvc.perform(get("/books"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(MockMvcResultMatchers.content()
                                               .json(new ObjectMapper().writeValueAsString(books)))
               .andDo(document("{methodName}",
                               preprocessRequest(prettyPrint()),
                               preprocessResponse(prettyPrint())));
    }

    @Test
    void getBook() throws Exception {
        mockMvc.perform(get("/books/{id}", 1L))
               .andExpect(status().isOk())
               .andDo(print())
               .andExpect(header().string("Content-Type", "application/json"))
               .andExpect(content().string(containsString("Jane Austen")))
               .andExpect(content().string(containsString("Pride and Prejudice")))
               .andDo(document("{methodName}",
                               preprocessRequest(prettyPrint()),
                               preprocessResponse(prettyPrint())));
    }

    @Test
    void getBookAgain() throws Exception {
        Book book = new Book(1L,
                             "Pride and Prejudice",
                             "Jane Austen",
                             "some description goes here",
                             new BigDecimal("50.00"));

        mockMvc.perform(get("/books/{id}", 1L))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(MockMvcResultMatchers.content()
                                               .json(new ObjectMapper().writeValueAsString(book)))
               .andDo(document("{methodName}",
                               preprocessRequest(prettyPrint()),
                               preprocessResponse(prettyPrint())));
    }

    @Test
    void addBook() throws Exception {
        Book book = Book.builder()
                        .id(7L)
                        .title("Winnetou")
                        .author("Karl May")
                        .description("some description goes here")
                        .price(new BigDecimal("11.11"))
                        .build();

        String bookJson = new ObjectMapper().writeValueAsString(book);

        mockMvc.perform(post("/books/")
                            .content(bookJson)
                            .contentType("application/json"))
               .andDo(print())
               .andExpect(status().isOk())
               .andDo(document("{methodName}",
                               preprocessRequest(prettyPrint()),
                               preprocessResponse(prettyPrint())));
    }

    @Test
    void editBook() throws Exception {
        Book book = Book.builder()
                        .id(1L)
                        .title("Winnetou")
                        .author("Karl May")
                        .description("some description goes here")
                        .price(new BigDecimal("11.11"))
                        .build();

        String bookJson = new ObjectMapper().writeValueAsString(book);

        mockMvc.perform(put("/books/")
                            .content(bookJson)
                            .contentType("application/json"))
               .andDo(print())
               .andExpect(status().isOk())
               .andDo(document("{methodName}",
                               preprocessRequest(prettyPrint()),
                               preprocessResponse(prettyPrint())));
    }

    @Test
    void deleteBook() throws Exception {
        mockMvc.perform(delete("/books/{id}", 1L))
               .andDo(print())
               .andExpect(status().isOk())
               .andDo(document("{methodName}",
                               preprocessRequest(prettyPrint()),
                               preprocessResponse(prettyPrint())));
    }
}
