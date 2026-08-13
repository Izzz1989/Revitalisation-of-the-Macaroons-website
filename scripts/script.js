document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

$(function () {
    const fields = [
        { id: 'product', label: 'ваш выбор' },
        { id: 'name', label: 'имя' },
        { id: 'phone', label: 'телефон' }
    ];

    function clearErrors() {
        fields.forEach(function (field) {
            $('#' + field.id)
                .removeClass('input-error');

            $('.error-message[data-for="' + field.id + '"]')
                .removeClass('visible')
                .text('');
        });
    }

    function showError(fieldId, label) {
        $('#' + fieldId).addClass('input-error');

        $('.error-message[data-for="' + fieldId + '"]')
            .addClass('visible')
            .text('Необходимо ввести ' + label);
    }

    function validateForm() {
        clearErrors();

        let isValid = true;

        fields.forEach(function (field) {
            const value = $('#' + field.id).val().trim();

            if (value === '') {
                showError(field.id, field.label);
                isValid = false;
            }
        });

        return isValid;
    }

    $('#order-form').on('submit', function (event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const $form = $(this);

        $('#loader-overlay').addClass('visible');

        $.ajax({
            url: 'https://testologia.ru/checkout',
            method: 'POST',
            dataType: 'json',
            data: {
                product: $('#product').val().trim(),
                name: $('#name').val().trim(),
                phone: $('#phone').val().trim()
            },
            success: function (response) {
                if (response.success === 1) {
                    $form.hide();
                    $('#order-success').addClass('visible');
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            },
            error: function () {
                alert('Не удалось отправить запрос. Проверьте интернет.');
            },

            complete: function () {
                $('#loader-overlay').removeClass('visible');
            }
        });
    });

    $('.choice-macaroons').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="images/prev.png" alt="Назад"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="images/next.png" alt="Вперёд"></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});