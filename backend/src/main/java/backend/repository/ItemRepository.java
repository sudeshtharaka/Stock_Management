package backend.repository;

// backend/repository/ItemRepository.java
import backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("SELECT i FROM Item i " +
            "WHERE (:buyerName IS NULL OR i.buyerName LIKE %:buyerName%) " +
            "AND (:sourceType IS NULL OR i.sourceType = :sourceType) " +
            "AND (:sale IS NULL OR i.sale = :sale) " +
            "AND (:stockClearing IS NULL OR i.stockClearing = :stockClearing)")
    List<Item> searchItems(@Param("buyerName") String buyerName,
                           @Param("sourceType") Item.SourceType sourceType,
                           @Param("sale") Boolean sale,
                           @Param("stockClearing") Boolean stockClearing);
}

