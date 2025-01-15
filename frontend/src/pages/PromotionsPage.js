import React from "react";
import "../assets/App.css";
import Navbar from "../components/Navbar";

const promotions = [
    {
        id: 1,
        title: "Promocja 2 za 1",
        description: "Zamów jedną pizzę, a drugą otrzymasz gratis! Oferta ważna do końca tygodnia.",
        imageUrl: "https://via.placeholder.com/300",
    },
    {
        id: 2,
        title: "Mega Pepperoni Deal",
        description: "Kup dużą pizzę Pepperoni za jedyne 20 PLN! Oferta dostępna tylko dzisiaj.",
        imageUrl: "https://via.placeholder.com/300",
    },
    {
        id: 3,
        title: "Rodzinna Uczta",
        description: "Zestaw rodzinny: 2 duże pizze + napój 1,5L za jedyne 60 PLN.",
        imageUrl: "https://via.placeholder.com/300",
    },
];

const PromotionsPage = () => {
    return (
        <div className="container-promotions-page">
            <Navbar/>
            <div className="promotions-page">
                <h1>Nasze Promocje</h1>
                <p>Sprawdź najnowsze promocje i skorzystaj z naszych specjalnych ofert!</p>

                <div className="promotions-list">
                    {promotions.map((promo, index) => (
                        <div
                            key={promo.id}
                            className={`promotion-item ${index % 2 === 0 ? "left" : "right"}`}
                        >
                            {index % 2 === 0 ? (
                                <>
                                    <img src={promo.imageUrl} alt={promo.title} className="promo-image" />
                                    <div className="promo-details">
                                        <h2>{promo.title}</h2>
                                        <p>{promo.description}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="promo-details">
                                        <h2>{promo.title}</h2>
                                        <p>{promo.description}</p>
                                    </div>
                                    <img src={promo.imageUrl} alt={promo.title} className="promo-image" />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromotionsPage;
