import React, { FC, ChangeEvent } from 'react';
import styles from './main-cards.module.css';
import { ICardProps } from 'src/components/main-cards/main-cards';
import { useState } from 'react';
import { TCard } from '@utils-types';

export const MainCardsUI: FC<ICardProps> = ({
  id,
  menuItemId,
  serialNumber,
  image,
  text
}) => {
  const isAuthenticated = true; //useSelector(state => state.auth.isAuthenticated); In logic later

  const [editedText, setEditedText] = useState(text);
  const [editedImage, setEditedImage] = useState(image);

  const handleSave = () => {
    // Save logic
    console.log('Saved');
  };

  const handleDelete = () => {
    // Delete logic
    console.log('Deleted');
  };

  return (
    <div className={styles.main_cards_card} key={id}>
      <div className={styles.main_cards_card_img}>
        <img
          className={styles.main_base_card_img}
          src={editedImage}
          alt={`card-${id}`}
        />
        {isAuthenticated && (
          <input
            className={styles.main_base_card_img_input}
            type='file'
            accept='image/*'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  const imageUrl = reader.result as string;
                  setEditedImage(imageUrl);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        )}
      </div>
      <div className={styles.main_base_card_text}>
        {isAuthenticated ? (
          <textarea
            className={styles.main_base_card_text_input}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <p className={styles.main_base_card_text_p}>{editedText}</p>
        )}
      </div>
      {isAuthenticated && (
        <div className={styles.main_base_card_buttons}>
          <button
            className={styles.main_base_card_button_save}
            onClick={handleSave}
          >
            Сохранить
          </button>
          <button
            className={styles.main_base_card_button}
            onClick={handleDelete}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

// export const MainCardsUI: FC<ICardProps> = ({
//   id,
//   menuItemId,
//   serialNumber,
//   image,
//   text
// }) => {
//   const isSelected = true; //при выбранном пункте меню useSelector(state => state.slice.isSelected) В логику потом
//   const isAuthenticated = true; //useSelector(state => state.auth.isAuthenticated); В логику потом

//   const [editedText, setEditedText] = useState(text);
//   const [editedImage, setEditedImage] = useState(image);

//   const handleSave = () => {
//     // логика сохранения
//     console.log('Сохранено');
//   };

//   const handleDelete = () => {
//     // логика удаления
//     console.log('Удалено');
//   };

//   return (
//       <div>
//         {isSelected && (
//           <div className={styles.main_cards}>
//             <div className={styles.main_cards_card}>
//               <div className={styles.main_cards_card_img}>
//                 <img
//                   className={styles.main_base_card_img}
//                   src={editedImage}
//                   alt={`card-${id}`}
//                 />
//                 {isAuthenticated && (
//                   <input
//                     className={styles.main_base_card_img_input}
//                     type='file'
//                     accept='image/*'
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         const reader = new FileReader();
//                         reader.onload = () => {
//                           const imageUrl = reader.result as string;
//                           setEditedImage(imageUrl);
//                         };
//                         reader.readAsDataURL(file);
//                       }
//                     }}
//                   />
//                 )}
//               </div>
//               <div className={styles.main_base_card_text}>
//                 {isAuthenticated ? (
//                   <textarea
//                     className={styles.main_base_card_text_input}
//                     value={editedText}
//                     onChange={(e) => setEditedText(e.target.value)}
//                   />
//                 ) : (
//                   <p className={styles.main_base_card_text_p}>{editedText}</p>
//                 )}
//               </div>
//               {isAuthenticated && (
//                 <div className={styles.main_base_card_buttons}>
//                   <button
//                     className={styles.main_base_card_button_save}
//                     onClick={handleSave}
//                   >
//                     Сохранить
//                   </button>
//                   <button
//                     className={styles.main_base_card_button}
//                     onClick={handleDelete}
//                   >
//                     Удалить
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* TODO: вывести ВСЕ карточки */}

//       </div>
//   );
// };
