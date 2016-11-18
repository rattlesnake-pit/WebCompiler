// JavaScript Document

  $(document).on('opening', '.remodal', function () {
    console.log('opening');
  });

  $(document).on('opened', '.remodal', function () {
    console.log('opened');
  });

  $(document).on('closing', '.remodal', function (e) {
    console.log('closing' + (e.reason ? ', reason: ' + e.reason : ''));
  });

  $(document).on('closed', '.remodal', function (e) {
    console.log('closed' + (e.reason ? ', reason: ' + e.reason : ''));
  });

  $(document).on('confirmation', '.remodal', function () {
    console.log('confirmation');
  });

  $(document).on('cancellation', '.remodal', function () {
    console.log('cancellation');
  });


  $('[data-remodal-id=modal2]').remodal({
    modifier: 'with-red-theme'
  });
  
 $(document).ready(function () {
            $("pa").each(function () {
                SetMoreLess(this, 150, 20, " ... más", " ... menos");
            });

            $("a.moreText").click(function () {
                $(this).hide();
                var pTag = $(this).parents("pa.summary");

                $(pTag).find("a.lessText").show();
                $(pTag).find("span.secondHalf").show();
            });

            $("a.lessText").click(function () {
                $(this).hide();
                var pTag = $(this).parents("pa.summary");

                $(pTag).find("a.moreText").show();
                $(pTag).find("span.secondHalf").hide();
            });
        });

        function SetMoreLess(para, thrLength, tolerance, moreText, lessText) {
            var alltext = $(para).html().trim();

            $(para).addClass("summary");        // this class is added to identify the p tag, when more/less links is clicked

            if (alltext.length + tolerance < thrLength) {
                return;
            }
            else {
                var firstHalf = alltext.substring(0, thrLength);
                var secondHalf = alltext.substring(thrLength, alltext.length);

                var firstHalfSpan = '<span class="firstHalf">' + firstHalf + '</span>';
                var secondHalfSpan = '<span class="secondHalf">' + secondHalf + '</span>';
                var moreTextA = '<a class="moreText">' + moreText + '</a>';
                var lessTextA = '<a class="lessText">' + lessText + '</a>';

                var newHtml = firstHalfSpan + moreTextA + secondHalfSpan + lessTextA;

                $(para).html(newHtml);
            }
        }
