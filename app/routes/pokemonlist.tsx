import type { LoaderFunctionArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData,} from "@remix-run/react";

export async function loader({request}:LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error("Failed to fetch Pokémon data");

  const data = await response.json();
  return json({ data, page });
}

export default function PokemonList() {
  const { data, page } = useLoaderData();

  return (
    <div>
      <h1>Pokémon Lista</h1>
      <ul>
        {data.results.map((pokemon: { name: string; url: string }) => (
          <li key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
      <div>
        {page > 1 && (
          <Link to={`/?page=${page - 1}`}>
            <button>Anterior</button>
          </Link>
        )}
        <Link to={`/?page=${page + 1}`}>
          <button>Siguiente</button>
        </Link>
      </div>
    </div>
  );
}


