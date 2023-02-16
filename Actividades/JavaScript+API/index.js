$(document).ready(function () {

    var url = "https://randomuser.me/api/?results=10";
    var p = "";
    var radioValue;
    var selectedNationality;
    var loadMore;

    fetchInformation(url);

    $("input[type='radio']").click(function () {
        radioValue = $("input[name='gender']:checked").val();
        selectedNationality = $('#nationality :selected').text();
        $("#result").empty();
        url = "https://randomuser.me/api/?results=10&gender=" + radioValue + "&nat=" + selectedNationality;
        if (radioValue) {
            fetchInformation(url);
        }
    });

    $('#nationality').on('change', function () {
        var p = "";
        $("#result").empty();
        selectedNationality = $('#nationality :selected').text();
        url = "https://randomuser.me/api/?results=10&gender=" + radioValue + "&nat=" + selectedNationality;
        fetchInformation(url);
    });

    function fetchInformation(url) {
        fetch(url)
            .then((response) => response.json())
            .then(function (data) {

                data.results.forEach(person => {

                    p = `<div class="well">
                        <img src="${person.picture.medium}" class="img-rounded" alt="image">
                        <span style="margin-left:25px;">${person.name.title}  ${person.name.first} ${person.name.last}</span>
                        <span>(${person.nat})</span>
                        <span style="margin-left:375px;">Email: ${person.email}</span>
                    </div>`;
                    $("#result").append(p);

                });

                loadMore = '<button id="loadmore" class="btn btn-primary">Cargar mas Usuarios</button>';

                $("#result").append(loadMore);

                $('#loadmore').on('click', function () {
                    fetchInformation(url);
                    $(this).remove();
                });


            })
    }

});