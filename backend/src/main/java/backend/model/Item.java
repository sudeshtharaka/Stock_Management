package backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    public enum SourceType {
        SELLER, OWN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    private String buyerName;
    private String materialName;
    private String materialType;

    @Enumerated(EnumType.STRING)
    private SourceType sourceType; // SELLER or OWN

    private double buyingPrice;
    private double sellingPercentage;
    private double sellingPrice;

    private boolean sale;
    private double salePercentage;


    private boolean stockClearing;
    private double stockClearingPrice;

    public void generateInitialCodeAndPrice() {
        this.code = generateCode(this.buyerName, this.materialName, this.materialType);
        this.sellingPrice = this.buyingPrice + (this.buyingPrice * this.sellingPercentage / 100);
    }

    private String generateCode(String buyer, String material, String type) {
        return (buyer.trim().substring(0, 2).toUpperCase() + "-" +
                material.trim().substring(0, 2).toUpperCase() + "-" +
                type.trim().substring(0, 2).toUpperCase() + "-" +
                System.currentTimeMillis());
    }

    public void applySale(double salePercentage) {
        this.sale = true;
        this.salePercentage = salePercentage;
        double discountedPrice = sellingPrice - (sellingPrice * salePercentage / 100);
        this.sellingPrice = Math.max(discountedPrice, buyingPrice);
    }

    public void applyStockClearing(double newPrice) {
        this.stockClearing= true;
        this.stockClearingPrice = newPrice;
        this.sellingPrice = newPrice;
    }
}
