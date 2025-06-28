package backend.service;

import backend.model.Item;
import backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service    
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item addItem(Item item) {
        // Generate code and initial price
        item.generateInitialCodeAndPrice();

        // Handle SALE item logic
        if (item.isSale() && item.getSalePercentage() > 0) {
            item.applySale(item.getSalePercentage());
        }

        // Handle STOCK CLEARING logic
        if (item.isStockClearing() && item.getStockClearingPrice() > 0) {
            item.applyStockClearing(item.getStockClearingPrice());
        }

        return itemRepository.save(item);
    }

    // backend/service/ItemService.java
    public List<Item> searchItems(String buyerName, Item.SourceType sourceType, Boolean sale, Boolean stockClearing) {
        return itemRepository.searchItems(buyerName, sourceType, sale, stockClearing);
    }

}
