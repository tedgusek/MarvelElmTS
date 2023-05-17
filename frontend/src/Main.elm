module Main exposing (..)

import Browser
import Html exposing (Html, div, img, p, text)
import Html.Attributes exposing (src)
import Http
import Json.Decode as Decode
import Task


type alias Character =
    { name : String
    , description : String
    , thumbnail : { path : String }
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


fetchCharacters : Task.Task Http.Error (List Character)
fetchCharacters =
    Http.get
        { url = "http://localhost:5173/characters"
        , expect = Http.expectJson CharactersReceived (Decode.list characterDecoder)
        }


characterDecoder : Decode.Decoder Character
characterDecoder =
    Decode.map3 Character
        (Decode.field "name" Decode.string)
        (Decode.field "description" Decode.string)
        (Decode.field "thumbnail" (Decode.map (\path -> { path = path }) (Decode.field "path" Decode.string)))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        CharactersReceived (Ok receivedCharacters) ->
            ( { model | characters = receivedCharacters }, Cmd.none )

        CharactersReceived (Err error) ->
            ( { model | errorMessage = Just (Debug.toString error) }, Cmd.none )


viewCharacter : Character -> Html msg
viewCharacter character =
    div []
        [ div [] [ text character.name ]
        , div [] [ text character.description ]
        , img [ src character.thumbnail.path ] []
        ]


view : Model -> Html Msg
view model =
    case model.errorMessage of
        Just errorMessage ->
            div [] [ text ("Error: " ++ errorMessage) ]

        Nothing ->
            div []
                (List.map viewCharacter model.characters)


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


init : ( Model, Cmd Msg )
init =
    ( initialModel, Task.perform fetchCharacters )
    


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


-- Helper functions for decoding and encoding JSON

decodeMsg : String -> Msg
decodeMsg json =
    case Decode.decodeString characterListDecoder json of
        Ok characters -> CharactersReceived (Ok characters)
        Err err -> CharactersReceived (Err (Http.BadBody err))


characterListDecoder : Decode.Decoder (List Character)
characterListDecoder =
    Decode.list characterDecoder

