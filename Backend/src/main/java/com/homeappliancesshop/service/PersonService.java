package com.homeappliancesshop.service;

import com.homeappliancesshop.model.Address;
import com.homeappliancesshop.model.Person;
import com.homeappliancesshop.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PersonService {

    @Autowired
    private PersonRepository repository;

    @Autowired
    private AddressService addressService;

    public List<Person> findAllPersons(){
        return repository.findAll();
    }

    public Person getPersonById(String personId){
        return repository.findById(personId).get();
    }
    public Person getPersonByEmail(String email) { return repository.findByEmail(email); }

    public Person addPerson(Person person){
        addressService.addAddress(person.getAddress());
        return repository.save(person);
    }

    public Person updatePerson(Person personRequest){
        Person existingPerson = repository.findById(personRequest.getPersonId()).get();
        existingPerson.setEmail(personRequest.getEmail());
        existingPerson.setPassword(personRequest.getPassword());
        existingPerson.setName(personRequest.getName());
        existingPerson.setSurname(personRequest.getSurname());
        existingPerson.setPhoneNumber(personRequest.getPhoneNumber());
        return repository.save(existingPerson);
    }

    public String deletePerson(String personId){
        repository.deleteById(personId);
        return personId + "person deleted from database";
    }
}
