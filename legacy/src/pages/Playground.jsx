import React, { useEffect, useState } from 'react';
import { categories, playgroundItems } from '@features/profile/constants/playgroundItems';
import * as PS from '@styles/PlaygroundStyles';

const Playground = () => {
  const [activeCategory, setActiveCategory] = useState('effects');
  const [selectedCard, setSelectedCard] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderCategories = () => (
    <PS.CategoryContainer>
      {categories.map(category => (
        <PS.CategoryButton
          key={category.id}
          $active={activeCategory === category.id}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.label}
        </PS.CategoryButton>
      ))}
    </PS.CategoryContainer>
  );

  const renderCards = () => (
    <PS.CardsContainer>
      <PS.CardsGrid>
        {playgroundItems[activeCategory].map((item, index) => (
          <PS.Card 
            key={index}
            onClick={() => setSelectedCard(item)}
          >
            <PS.CardTitle>{item.title}</PS.CardTitle>
            <PS.CardDescription>{item.description}</PS.CardDescription>
            {item.tech.map(tech => (
              <PS.TechTag key={tech}>{tech}</PS.TechTag>
            ))}
          </PS.Card>
        ))}
      </PS.CardsGrid>
    </PS.CardsContainer>
  );

  const renderContent = () => (
    <PS.ContentContainer>
      <PS.BackButton onClick={() => setSelectedCard(null)}>
        <i className="fas fa-chevron-left"></i>
        돌아가기
      </PS.BackButton>
      <PS.ContentTitle>{selectedCard.title}</PS.ContentTitle>
      {selectedCard.content && <selectedCard.content />}
    </PS.ContentContainer>
  );

  return (
    <PS.PlaygroundContainer>
      {!selectedCard ? (
        <>
          {renderCategories()}
          {renderCards()}
        </>
      ) : (
        renderContent()
      )}
    </PS.PlaygroundContainer>
  );
};

export default Playground; 