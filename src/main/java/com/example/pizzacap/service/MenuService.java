package com.example.pizzacap.service;

import com.example.pizzacap.model.MenuItem;
import com.example.pizzacap.model.MenuItemSize;
import com.example.pizzacap.model.MenuToDisplay;
import com.example.pizzacap.repository.MenuRepo;
import com.example.pizzacap.repository.MenuSizeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuService {
    @Autowired
    MenuRepo repoMenu;

    @Autowired
    MenuSizeRepo repoMenuSize;

    public List<MenuToDisplay> getMenu() {
        List<MenuItem> menuItems = repoMenu.findAll();
        List<MenuToDisplay> menuToDisplays = new ArrayList<>();

        for (MenuItem menuItem : menuItems) {
            MenuToDisplay temp = new MenuToDisplay();
            temp.setMenuId(menuItem.getMenu_id());
            temp.setName(menuItem.getName());
            temp.setDescription(menuItem.getDescription());
            temp.setType(menuItem.getType());
            temp.setImage(menuItem.getImage());
            List<MenuToDisplay.MenuToDisplaySize> tempSizes = new ArrayList<>();

            List<MenuItemSize> sizesFromRepo = repoMenuSize.findByMenuItem(menuItem);
            for (MenuItemSize menuItemSize : sizesFromRepo) {
                MenuToDisplay.MenuToDisplaySize tempSize = new MenuToDisplay.MenuToDisplaySize();
                tempSize.setMenuSizeId(menuItemSize.getMenuSizeId());
                tempSize.setItemSize(menuItemSize.getItem_size());
                tempSize.setPrice(menuItemSize.getPrice());
                tempSizes.add(tempSize);
            }
            temp.setSizes(tempSizes);
            menuToDisplays.add(temp);
        }

        return menuToDisplays;
    }

    public double getMenuItemPrice(int menuSizeId){
        MenuItemSize item = repoMenuSize.findByMenuSizeId(menuSizeId);
        return item.getPrice();
    }

    public MenuItem getMenuItem(int menuItemId) {
        return repoMenu.findById(menuItemId).orElse(new MenuItem());
    }
}