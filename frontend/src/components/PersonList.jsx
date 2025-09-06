import PersonCard from "./PersonCard"

export default function PersonList({people}) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
{people.map((actors) => (
    <PersonCard key={actors.id} person={actors} />
))}
        </div>
    )
}