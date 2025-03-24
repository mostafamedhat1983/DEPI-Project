package com.shop.shop.data.repositories;

import com.shop.shop.data.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


@RepositoryRestResource(collectionResourceRel = "users", path = "users")
@CrossOrigin("*")
public interface UserRepository extends JpaRepository<User, Long> {
    @RestResource
    User findOneByEmail(String email);
}
