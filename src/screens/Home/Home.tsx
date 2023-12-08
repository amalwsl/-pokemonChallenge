import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { gql } from "graphql-tag"

const header = ["Id", "Name", "Ability", "Stats", "Types"]

const GET_POKEMON_LIST = gql`
    {
        pokemon_v2_pokemonability(limit: 100) {
            pokemon_id
            ability_id
            pokemon_v2_ability {
                name
            }
            pokemon_v2_pokemon {
                name
                id
                pokemon_v2_pokemonstats {
                    pokemon_v2_stat {
                        name
                        is_battle_only
                        move_damage_class_id
                    }
                }
                pokemon_v2_pokemontypes {
                    pokemon_v2_type {
                        name
                    }
                }
            }
        }
    }
`

const GET_ABILITIES_LIST = gql`
    {
        pokemon_v2_ability {
            name
        }
    }
`

const Cell = ({ text }: { text: string }): React.ReactElement => {
    return <span className="bg-white p-1 rounded-lg border-2 "> {text} </span>
}

const Item = ({
    name,
    id,
    ability,
    stats,
    type,
}: {
    name: string
    type: PokemonType[]
    id: string
    stats: PokemonStats[]
    ability: string
}): React.ReactElement => {
    return (
        <div className="bg-gray-100 py-2 px-3 rounded-lg grid grid-flow-col gap-4 ">
            <span className="text-center">{id}</span>

            <span className="text-center"> {name}</span>

            <span className="text-center"> {ability}</span>
            <div>
                {stats.map((s) => (
                    <Cell text={s.pokemon_v2_stat.name} />
                ))}
            </div>
            <div>
                {type.map((t) => (
                    <Cell text={t.pokemon_v2_type.name} />
                ))}
            </div>
        </div>
    )
}

const PokemonList = () => {
    const {
        loading: abilitiesLoading,
        error: abilitiesError,
        data: abilitiesData,
    } = useQuery(GET_ABILITIES_LIST)
    const {
        loading: pokemonLoading,
        error: pokemonError,
        data: pokemonData,
    } = useQuery(GET_POKEMON_LIST)

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")

    if (abilitiesLoading || pokemonLoading) return <p>Loading...</p>
    if (abilitiesError || pokemonError)
        return <p>Error: {abilitiesError?.message || pokemonError?.message}</p>

    const PokemonList: { pokemon_v2_pokemonability: PokemonData[] } = pokemonData
    const AbilityList: string[] = abilitiesData.pokemon_v2_ability.map(
        (a: { name: string }) => a.name
    )
    const filterredData =
        !search && !filter
            ? PokemonList.pokemon_v2_pokemonability
            : search && !filter
            ? PokemonList.pokemon_v2_pokemonability.filter((f) =>
                  f.pokemon_v2_pokemon.name.match(search)
              )
            : filter && !search
            ? PokemonList.pokemon_v2_pokemonability.filter(
                  (f) => f.pokemon_v2_ability.name == filter
              )
            : PokemonList.pokemon_v2_pokemonability.filter(
                  (f) =>
                      f.pokemon_v2_ability.name == filter && f.pokemon_v2_pokemon.name.match(search)
              )
    return (
        <div className="w-full h-full flex flex-col p-8 gap-2 flex-center ">
            <div className="flex  w-full justify-between">
                <input
                    className="focus:outline-none p-2 w-1/3 rounded-lg bg-gray-50 "
                    value={search}
                    onChange={(v) => setSearch(v.target.value)}
                    placeholder="search for your favourite pokémon !"
                />
                <select
                    value={filter}
                    onChange={(v) => setFilter(v.target.value)}
                    placeholder="choose your ability filter"
                    className=" bg-gray-50 p-2 w-1/3 focus:outline-none ">
                    {AbilityList.sort().map((a) => (
                        <option key={a} value={a}>
                            {a}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-flow-col bg-gray-800 text-white rounded-lg">
                {header.map((h, i) => (
                    <span className="text-center font-semibold text-lg" key={i}>
                        {h}
                    </span>
                ))}
            </div>
            <div className="flex flex-col overflow-hidden overflow-y-scroll h-full">
                {filterredData.map((pokemon) => (
                    <Item
                        name={pokemon.pokemon_v2_pokemon.name}
                        ability={pokemon.pokemon_v2_ability.name}
                        stats={pokemon.pokemon_v2_pokemon.pokemon_v2_pokemonstats}
                        type={pokemon.pokemon_v2_pokemon.pokemon_v2_pokemontypes}
                        id={pokemon.pokemon_id.toString()}
                    />
                ))}
            </div>
        </div>
    )
}

export default PokemonList
