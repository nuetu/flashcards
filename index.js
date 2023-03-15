$(document).ready(function () {
  var data = [];
  $.getJSON(
    "https://raw.githubusercontent.com/hathibelagal/German-English-JSON-Dictionary/master/german_english.json",
    function (result) {
      $.each(result, function (ger, eng) {
        data.push([ger, eng]);
      });
      shuffle(data);
      var item = data[count];
      $("#ger").text(item[0]);
      $("#eng").text(item[1]);
    }
  );
  count = 0;
  $("#next").click(function () {
    count++;
    $("#ger").css("display", "inline");
    $("#eng").css("display", "none");
    $("#def").empty();
    var item = data[count];
    $("#ger").text(item[0]);
    $("#eng").text(item[1]);
  });
  $("#back").click(function () {
    if (count > 0) {
      count--;
    }
    $("#ger").css("display", "inline");
    $("#eng").css("display", "none");
    var item = data[count];
    $("#ger").text(item[0]);
    $("#eng").text(item[1]);
  });
  $("#card").click(function () {
    if ($("#ger").css("display") == "none") {
      $("#ger").css("display", "inline");
      $("#eng").css("display", "none");
    } else {
      $("#ger").css("display", "none");
      $("#eng").css("display", "inline");
    }
  });
  $("#define").click(function () {
    define($("#eng").text());
  });
  const apiKey = "";

  function define(current_word) {
    $("#def").text("Loading...");
    var prompt =
      "Write a simple sentence in german using, " + current_word + '" ';
    fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 256,
        n: 1,
        temperature: 0.7,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const output = data.choices[0].text.trim();
        $("#def").text(output);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
