package backend.controller;

import backend.model.Item;
import backend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*") // Allow access from frontend (React)
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    // backend/controller/ItemController.java
    @GetMapping("/search")
    public List<Item> searchItems(
            @RequestParam(required = false) String buyerName,
            @RequestParam(required = false) Item.SourceType sourceType,
            @RequestParam(required = false) Boolean sale,
            @RequestParam(required = false) Boolean stockClearing
    ) {
        return itemService.searchItems(buyerName, sourceType, sale, stockClearing);
    }

}
