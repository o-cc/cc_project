function noteModuleFile () {

    let noteInfoIncache = noteModule.noteInfoIncache;
    noteInfoIncache     = noteInfoIncache?noteInfoIncache:" ";
    let len             = noteInfoIncache.length;
    console.log( noteInfoIncache );
    try {
        for ( let i = 0; i < len; i++ ) {

            let element = noteInfoIncache[i];
            let title   = element[ "titile" ];
            let content = element[ "content" ] ? element[ "content" ] : " ";

            if ( title.length > 9 ) {
                title = title.slice( 0, 9 );
            }

            if ( content.length > 60 ) {
                content = content.slice( 0, 60 );
            }

            let str = `
                   <div class="note_item">
                        <div class="item_title">
                            <h5>`+ title +`</h5>
                        </div>
                        <div class="item_content">
                            <p>
                                `+ content +`
                            </p>
                        </div>
                   </div>
                `;

            $( ".note_items" ).append( str );
        }
        if( $( ".note_item" ).length < 6 ) {
            let len = $( ".note_item" ).length;

            for ( let i = 0; i < 6 - len; i++ ) {
                $( ".note_items" ).append( "<div class='note_item' style='opacity: 0'></div>" );
            }
        }


    }catch ( e ) {
        console.log( e );
    }

    //点击保存
    $(".save_notes_btn").click( function () {
        //点击保存
        //是否有声音
        if( !$(".note_title").val() ) {
            loger( "请填写备忘录标题" );
            return;
        }

        if( !editor1.txt.html() ) {
            loger( "请填写内容" );
            return;
        }


        let changeData = {
            "title"    : $(".note_title").val(),
            "content"  : editor1.txt.html(),

        };
        noteModule.postNoteInfo( changeData, function (err, res) {
            if( err ) {
                loger( err );
                return;
            }

            //将最新的数据写入到html上
            let content = editor1.txt.html();
            content.length > 60?content.slice( 0, 60 ): content;

            let str = `
                   <div class="memo_item">
                        <div class="item_title">
                            <h5>`+ $(".note_title").val() +`</h5>
                        </div>
                        <div class="item_content">
                            <p>
                                `+ content +`
                            </p>
                        </div>
                   </div>
                `;
            $(".note_add").after( str );
            loger( res );
            GoHashUrl( "notes" );

        })
    })

};

export { noteModuleFile }