

export function Pagination({ emailsPerPage, totalEmails, currentPage, onPageChange }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalEmails / emailsPerPage); i++) {
        pageNumbers.push(i)
    }

    // console.log('Total Emails:', totalEmails)
    // console.log('Current Page:', currentPage)
    // console.log('emailsPerPage:', emailsPerPage)

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item clean-list">
                        <button
                            onClick={() => onPageChange(number)}
                            className={`page-link ${currentPage === number ? 'active' : ''}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

