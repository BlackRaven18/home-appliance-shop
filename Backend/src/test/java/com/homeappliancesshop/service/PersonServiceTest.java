package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Address;
import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.repository.PersonRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PersonServiceTest {
    @InjectMocks
    private PersonService personService;

    @Mock
    private PersonRepository personRepository;

    @Mock
    private AddressService addressService;

    @Mock
    private TransactionsHistoryService transactionsHistoryService;

    @BeforeEach
    public void setUp() { MockitoAnnotations.openMocks(this); }

    @AfterEach
    void clear() {
        reset(personRepository);
        reset(addressService);
        reset(transactionsHistoryService);
    }

    @Test
    void findAllPersons() {
        List<Person> persons = new ArrayList<>();
        persons.add(new Person());
        persons.add(new Person());

        when(personRepository.findAll()).thenReturn(persons);

        List<Person> result = personService.findAllPersons();

        assertEquals(persons.size(), result.size());
        verify(personRepository, times(1)).findAll();
    }

    @Test
    void getPersonById_Exists() {
        String personId = "123";
        Person person = new Person();
        person.setPersonId(personId);
        when(personRepository.findById(personId)).thenReturn(Optional.of(person));

        Person result = personService.getPersonById(personId);

        assertEquals(person, result);
        verify(personRepository, times(1)).findById(personId);
    }

    @Test
    void getPersonById_DoesNotExist() {
        String personId = "personId";

        when(personRepository.findById(personId)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            personService.getPersonById(personId);
        });

        verify(personRepository, times(1)).findById(personId);
    }


    @Test
    void addPerson() {
        Person person = new Person();
        person.setEmail("test@example.com");
        person.setPassword("password123");
        person.setName("Name");
        person.setSurname("Surname");
        person.setPhoneNumber("123456789");
        Address address = new Address();
        address.setStreet("Street");
        address.setApartment("1A");
        address.setCity("City");
        address.setState("State");
        address.setPostCode("12-345");
        person.setAddress(address);
        TransactionsHistory transactionsHistory = new TransactionsHistory();
        when(transactionsHistoryService.addTransactionsHistory(any(TransactionsHistory.class))).thenReturn(transactionsHistory);
        when(addressService.addAddress(any(Address.class))).thenReturn(address);
        when(personRepository.save(person)).thenReturn(person);

        Person result = personService.addPerson(person);

        assertEquals(address, person.getAddress());
        assertEquals(transactionsHistory, person.getTransactionsHistory());
        verify(addressService, times(1)).addAddress(address);
        verify(transactionsHistoryService, times(1)).addTransactionsHistory(any(TransactionsHistory.class));
        verify(personRepository, times(1)).save(person);
        assertEquals(person, result);
    }

    @Test
    void updatePerson() {
        String personId = "123";
        Person existingPerson = new Person();
        existingPerson.setPersonId(personId);
        existingPerson.setName("Original Name");
        existingPerson.setSurname("Original Surname");
        existingPerson.setEmail("original.email@example.com");
        existingPerson.setPassword("originalpassword");
        existingPerson.setPhoneNumber("123456789");

        Person personRequest = new Person();
        personRequest.setPersonId(personId);
        personRequest.setName("John");
        personRequest.setSurname("Doe");
        personRequest.setEmail("john.doe@example.com");
        personRequest.setPassword("newpassword");
        personRequest.setPhoneNumber("987654321");

        when(personRepository.findById(personId)).thenReturn(Optional.of(existingPerson));
        when(personRepository.save(existingPerson)).thenReturn(existingPerson);

        Person result = personService.updatePerson(personRequest);

        assertEquals(personRequest, result);

        verify(personRepository, times(1)).findById(personId);
        verify(personRepository, times(1)).save(existingPerson);
    }

    @Test
    void deletePerson() {
        String personId = "123";

        personService.deletePerson(personId);

        verify(personRepository, times(1)).deleteById(personId);
    }

    @Test
    void addTransaction() {
        String personId = "personId";
        Transaction transaction = new Transaction();

        Person person = new Person();
        person.setTransactionsHistory(new TransactionsHistory());

        TransactionsHistory updatedTransactionsHistory = new TransactionsHistory();

        when(personRepository.findById(personId)).thenReturn(java.util.Optional.of(person));
        when(transactionsHistoryService.addTransaction(any(), any())).thenReturn(updatedTransactionsHistory);

        TransactionsHistory result = personService.addTransaction(personId, transaction);

        assertEquals(updatedTransactionsHistory, result);
        verify(personRepository, times(1)).findById(personId);
        verify(transactionsHistoryService, times(1)).addTransaction(any(), any());
    }

    @Test
    void existsByEmail_Exists() {
        String email = "test@example.com";
        Person person = new Person();
        when(personRepository.findByEmail(email)).thenReturn(person);

        boolean result = personService.existsByEmail(email);

        assertTrue(result);
        verify(personRepository, times(1)).findByEmail(email);
    }

    @Test
    void existsByEmail_NotExists() {
        String email = "test@example.com";
        when(personRepository.findByEmail(email)).thenReturn(null);

        boolean result = personService.existsByEmail(email);

        assertFalse(result);
        verify(personRepository, times(1)).findByEmail(email);
    }

    @Test
    void getPersonByLoginDatas_Exists() {
        String email = "test@example.com";
        String password = "password";
        Person person = new Person();
        person.setEmail(email);
        person.setPassword(password);
        when(personRepository.findByEmail(email)).thenReturn(person);

        Person result = personService.getPersonByLoginDatas(email, password);

        assertEquals(person, result);
        verify(personRepository, times(2)).findByEmail(email);
    }

    @Test
    void getPersonByLoginDatas_NotExists() {
        String email = "test@example.com";
        String password = "password";
        when(personRepository.findByEmail(email)).thenReturn(null);

        Person result = personService.getPersonByLoginDatas(email, password);

        assertNull(result);
        verify(personRepository, times(1)).findByEmail(email);
    }
}