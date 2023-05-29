package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.model.Transaction;
import com.homeappliancesshop.model.TransactionsHistory;
import com.homeappliancesshop.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    @Autowired
    private PersonRepository repository;

    @Autowired
    private AddressService addressService;

    @Autowired
    private TransactionsHistoryService transactionsHistoryService;

    public List<Person> findAllPersons() {
        return repository.findAll();
    }

    public Person getPersonById(String personId) {
        return repository.findById(personId).get();
    }

    public Person addPerson(Person person) {
        addressService.addAddress(person.getAddress());
        TransactionsHistory transactionsHistory = transactionsHistoryService.addTransactionsHistory(new TransactionsHistory());
        person.setTransactionsHistory(transactionsHistory);
        return repository.save(person);
    }

    public Person updatePerson(Person personRequest) {
        Person existingPerson = repository.findById(personRequest.getPersonId()).get();
        existingPerson.setName(personRequest.getName());
        existingPerson.setSurname(personRequest.getSurname());
        existingPerson.setEmail(personRequest.getEmail());
        existingPerson.setPassword(personRequest.getPassword());
        existingPerson.setPhoneNumber(personRequest.getPhoneNumber());
        return repository.save(existingPerson);
    }

    public String deletePerson(String personId) {
        repository.deleteById(personId);
        return personId + "person deleted from database";
    }

    public TransactionsHistory addTransaction(String personId, Transaction transaction) {
        Person person = repository.findById(personId).get();

        return transactionsHistoryService.addTransaction(
                person.getTransactionsHistory().getTransactionId(), transaction);
    }

    public boolean existsByEmail(String email) {
        return repository.findByEmail(email) != null;
    }

    public Person getPersonByLoginDatas(String email, String password) {
        if(repository.findByEmail(email) != null){
            Person person = repository.findByEmail(email);
            if (person.getPassword().equals(password)) {
                return person;
            }
            return null;
        }
        return null;
    }

}
