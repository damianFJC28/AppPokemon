// routes/pokemon/$name.tsx
import type { LoaderFunctionArgs, ActionFunctionArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, } from "@remix-run/react";


export async function loader({ params }:LoaderFunctionArgs) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  if (!response.ok) throw new Response("Not Found", { status: 404 });

  const pokemon = await response.json();
  return json(pokemon);
}

export default function PokemonDetail() {
  const pokemon = useLoaderData();

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <ul>
        <li>Height: {pokemon.height}</li>
        <li>Weight: {pokemon.weight}</li>
        <li>Base Experience: {pokemon.base_experience}</li>
      </ul>
      <Link to="/">Back to List</Link>
    </div>
  );
}


