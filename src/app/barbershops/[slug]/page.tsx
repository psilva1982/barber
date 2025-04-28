type Props = {
    params: Promise<{ slug: string }>
}

const BarbershopPage = async ({ params }: Props) => {
    const { slug } = await params

    return (
        <div>
            <h1>{slug}</h1>
        </div>
    );
}

export default BarbershopPage;