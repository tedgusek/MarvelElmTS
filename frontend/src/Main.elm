module Main exposing (main)

import Browser
import Html exposing (Html, div, img, text)
import Html.Attributes exposing (src, id)
import Http exposing (Error(..))
import Json.Decode as Decode
import Css exposing (..)


type alias Character =
    { name : String
    , description : String
    , thumbnail : Thumbnail
    }


type alias Thumbnail =
    { path : String
    }


type alias Model =
    { characters : List Character
    , errorMessage : Maybe String
    }


initialModel : Model
initialModel =
    { characters = []
    , errorMessage = Nothing
    }


type Msg
    = CharactersReceived (Result Http.Error (List Character))


fetchCharacters : Cmd Msg
fetchCharacters =
    -- Http.get returns a Cmd Msg!
    Http.get
        { url = "http://localhost:5173/characters"
        , expect = Http.expectJson CharactersReceived (Decode.list characterDecoder)
        }


characterDecoder : Decode.Decoder Character
characterDecoder =
    Decode.map3 Character
        (Decode.field "name" Decode.string)
        (Decode.field "description" Decode.string)
        (Decode.field "thumbnail"
            (Decode.map Thumbnail (Decode.field "path" Decode.string))
        )


update : ( Msg -> Model -> ( Model, Cmd Msg ) )
update msg model =
    case msg of
        CharactersReceived (Ok receivedCharacters) ->
            ( { model | characters = receivedCharacters }, Cmd.none )

        CharactersReceived (Err error) ->
            ( { model
                | errorMessage =
                    Just
                        (case error of
                            BadUrl _ ->
                                "bad url"

                            _ ->
                                -- you should pattern match on all cases, ideally in a separate function
                                "Other"
                        )
              }
            , Cmd.none
            )


viewCharacter : Character -> Html msg
viewCharacter character =
    div [ id "card" ]
        [ div [ id "name" ] [ text character.name ]
        , div [ id "description" ] [ text character.description ]
        , img [ src character.thumbnail.path ] []
        ]


view : Model -> Html Msg
view model =
    case model.errorMessage of
        Just errorMessage ->
            div [] [ text ("Error: " ++ errorMessage) ]

        Nothing ->
            div [ id "empty" ]
                (List.map viewCharacter model.characters)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : () -> ( Model, Cmd Msg )
init _ =
    ( initialModel, fetchCharacters )
-- init : ( Model, Cmd Msg )
-- init =
--     ( initialModel, fetchCharacters )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


characterListDecoder : Decode.Decoder (List Character)
characterListDecoder =
    Decode.list characterDecoder
