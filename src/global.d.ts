type PokemonType = {
    pokemon_v2_type: {
        name: string
    }
}

type PokemonStats = {
    pokemon_v2_stat: {
        name: string
        is_battle_only: boolean
        move_damage_class_id: number | null
    }
}

type Pokemon = {
    name: string
    id: number
    pokemon_v2_pokemonstats: PokemonStats[]
    pokemon_v2_pokemontypes: PokemonType[]
}

type Ability = {
    name: string
}

type PokemonData = {
    pokemon_id: number
    ability_id: number
    pokemon_v2_ability: Ability
    pokemon_v2_pokemon: Pokemon
}
