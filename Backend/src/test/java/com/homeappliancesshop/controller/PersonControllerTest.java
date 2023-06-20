package com.homeappliancesshop.controller;

import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.service.PersonService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class PersonControllerTest {

    @InjectMocks
    private PersonController personController;

    @Mock
    private PersonService personService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void clear() { reset(personService); }

    @Test
    void getPersons() {
        List<Person> expectedPersons = new ArrayList<>();
        when(personService.findAllPersons()).thenReturn(expectedPersons);

        List<Person> result = personController.getPersons();

        assertEquals(expectedPersons, result);
        verify(personService, times(1)).findAllPersons();
    }

    @Test
    void getPersonById() {
        String personId = "123";
        Person expectedPerson = new Person();
        when(personService.getPersonById(personId)).thenReturn(expectedPerson);

        Person result = personController.getPersonById(personId);

        assertEquals(expectedPerson, result);
        verify(personService, times(1)).getPersonById(personId);
    }

    @Test
    void getPersonTransactionsHistory() {
        String personId = "123";
        TransactionsHistory expectedHistory = new TransactionsHistory();
        Person person = new Person();
        person.setTransactionsHistory(expectedHistory);
        when(personService.getPersonById(personId)).thenReturn(person);

        TransactionsHistory result = personController.getPersonTransactionsHistory(personId);

        assertEquals(expectedHistory, result);
        verify(personService, times(1)).getPersonById(personId);
    }

    @Test
    void getPersonId_ReturnsOkResponse() {
        Person person = new Person();
        person.setEmail("test@example.com");
        person.setPassword("password");
        person.setPersonId("123");

        when(personService.getPersonByLoginDatas(person.getEmail(), person.getPassword())).thenReturn(person);

        ResponseEntity<?> response = personController.getPersonId(person);

        assertEquals(ResponseEntity.ok(person.getPersonId()), response);
        verify(personService, times(1)).getPersonByLoginDatas(person.getEmail(), person.getPassword());
    }

    @Test
    void getPersonId_InvalidCredentials_ReturnsUnauthorizedResponse() {
        Person person = new Person();
        person.setEmail("test@example.com");
        person.setPassword("password");

        when(personService.getPersonByLoginDatas(person.getEmail(), person.getPassword())).thenReturn(null);

        ResponseEntity<?> response = personController.getPersonId(person);

        assertEquals(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("\n" + "Invalid login details or user does not exist"), response);
        verify(personService, times(1)).getPersonByLoginDatas(person.getEmail(), person.getPassword());
    }

    @Test
    void createPerson_ReturnsOkResponse() {
        Person person = new Person();
        person.setEmail("test@example.com");
        person.setPersonId("123");

        when(personService.existsByEmail(anyString())).thenReturn(false);
        when(personService.addPerson(person)).thenReturn(person);

        ResponseEntity<?> response = personController.createPerson(person);

        assertEquals(ResponseEntity.ok(person.getPersonId()), response);
        verify(personService, times(1)).existsByEmail(anyString());
        verify(personService, times(1)).addPerson(person);
    }

    @Test
    void createPerson_PersonWithEmailExists_ReturnsBadRequestResponse() {
        Person person = new Person();
        person.setEmail("test@example.com");

        when(personService.existsByEmail(anyString())).thenReturn(true);

        ResponseEntity<?> response = personController.createPerson(person);

        assertEquals(ResponseEntity.badRequest().body("Email already exists"), response);
        verify(personService, times(1)).existsByEmail(anyString());
        verify(personService, never()).addPerson(any());
    }

    @Test
    void modifyPerson() {
        Person person = new Person();
        Person updatedPerson = new Person();
        when(personService.updatePerson(person)).thenReturn(updatedPerson);

        Person result = personController.modifyPerson(person);

        assertEquals(updatedPerson, result);
        verify(personService, times(1)).updatePerson(person);
    }

    @Test
    void deletePerson() {
        String personId = "123";
        when(personService.deletePerson(personId)).thenReturn("Deleted");

        String result = personController.deletePerson(personId);

        assertEquals("Deleted", result);
        verify(personService, times(1)).deletePerson(personId);
    }
}
