package com.studio.PhotoStudio_Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studio.PhotoStudio_Backend.entity.Booking;
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{
      public List<Booking> findByUserId(Long userId);
      
}
