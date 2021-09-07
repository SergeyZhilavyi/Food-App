import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimeId) {

    //Forms

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро свяжемся с вами',
        failure: 'Что-то пошло не так...'
    };

    
    forms.forEach(item => {
     bindpostData(item); 
    });

     //В функцию мы передадим форму 
     function bindpostData(form) {
         form.addEventListener('submit', (e) => {
             e.preventDefault();

             const setMessage = document.createElement('img');
             setMessage.src = message.loading;
             setMessage.style.cssText = `
                 display: block;
                 margin: 0 auto;
             ` ;
             
             // Предотвращаем поломку вёрстки, при срабатывании спиннера загрузки
             form.insertAdjacentElement('afterend', setMessage);

            
             const formData = new FormData(form); 
             const json = JSON.stringify(Object.fromEntries(formData.entries()));
             
             postData('http://localhost:3000/requests', json) 
             .then(data => {
                 console.log(data);
                 showThanksModal(message.success);
                 setMessage.remove();
             })
             .catch(() => {
                 showThanksModal(message.failure);
             })
             .finally(() => {
                 form.reset();
             });

             
         });
     }

     
     function showThanksModal(message) {
         const prevModalDialog = document.querySelector('.modal__dialog');
         prevModalDialog.classList.add('hide');
          
         openModal('.modal', modalTimeId); //Теперь, когда showThanksModal вызывается, наше модальное окно открывается

         //Cоздаём новый контент 
         const thanksModal = document.createElement('div');
         thanksModal.classList.add('.modal__dialog');
         thanksModal.innerHTML = `
             <div class ="modal__content">
             <div data-close class="modal__close">&times;</div>
             <div class="modal__title">${message}</div>
             </div>
         `;

         document.querySelector('.modal').append(thanksModal);

         //Теперь, когда блок наш сформирован. Мы хотим, чтобы пользователь при повторном нажатии
         //получал прошлое, стартовое окно. Для этого созданное нами только что окно должно исчезать
         setTimeout(() => {
             thanksModal.remove();
             prevModalDialog.classList.add('show');
             prevModalDialog.classList.remove('hide');
             closeModal('.modal');
         }, 4000);
     }

     fetch('http://localhost:3000/menu')
     .then(data => data.json())
     .then(res => console.log(res));

}

export default forms;