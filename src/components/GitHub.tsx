import { useEffect, useState } from 'react'
import './GitHub.css'

const GITHUB_USERNAME = 'nelsfikar-dotcom'

interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
}

interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

interface GitHubEvent {
  id: string
  type: string
  repo: { name: string }
  created_at: string
}

function GitHub() {
const [user, setUser] = useState<GitHubUser | null>(null)
const [repos, setRepos] = useState<GitHubRepo[]>([])
const [events, setEvents] = useState<GitHubEvent[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`),
        ])

        if (!userRes.ok) throw new Error('Gagal mengambil data GitHub')

        const userData: GitHubUser = await userRes.json()
        const reposData: GitHubRepo[] = await reposRes.json()
        const eventsData: GitHubEvent[] = await eventsRes.json()

        setUser(userData)
        setRepos(reposData)
        setEvents(eventsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const getEventLabel = (type: string) => {
    const labels: Record<string, string> = {
      PushEvent: '📤 Push',
      CreateEvent: '🆕 Create',
      PullRequestEvent: '🔀 Pull Request',
      IssuesEvent: '🐛 Issue',
      WatchEvent: '⭐ Star',
      ForkEvent: '🍴 Fork',
      DeleteEvent: '🗑️ Delete',
      IssueCommentEvent: '💬 Comment',
      PullRequestReviewEvent: '👀 Review',
    }
    return labels[type] || `📌 ${type.replace('Event', '')}`
  }

//   const getContributionWeeks = () => {
//     const weeks: { date: string; count: number; day: number }[][] = []
//     const today = new Date()
//     const totalWeeks = 16
//     const startDate = new Date(today)
//     startDate.setDate(startDate.getDate() - (totalWeeks * 7 - 1) - startDate.getDay())

//     let currentWeek: { date: string; count: number; day: number }[] = []
//     const d = new Date(startDate)

//     while (d <= today) {
//       const dateStr = d.toISOString().split('T')[0]
//       const dayOfWeek = d.getDay()
//       currentWeek.push({
//         date: dateStr,
//         count: contributions[dateStr] || 0,
//         day: dayOfWeek,
//       })
//       if (dayOfWeek === 6) {
//         weeks.push(currentWeek)
//         currentWeek = []
//       }
//       d.setDate(d.getDate() + 1)
//     }
//     if (currentWeek.length > 0) {
//       weeks.push(currentWeek)
//     }
//     return weeks
//   }

//   const getContribColor = (count: number) => {
//     if (count === 0) return 'rgba(255, 255, 255, 0.04)'
//     if (count <= 2) return 'rgba(102, 126, 234, 0.3)'
//     if (count <= 5) return 'rgba(102, 126, 234, 0.5)'
//     if (count <= 9) return 'rgba(102, 126, 234, 0.7)'
//     return 'rgba(102, 126, 234, 0.95)'
//   }

//   const getTotalContributions = () => {
//     return Object.values(contributions).reduce((sum, c) => sum + c, 0)
//   }

  const getLangColor = (lang: string | null) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      Python: '#3572A5',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Java: '#b07219',
      Go: '#00ADD8',
      Rust: '#dea584',
      PHP: '#4F5D95',
    }
    return colors[lang || ''] || '#8b8b8b'
  }

  if (loading) {
    return (
      <section className="github-section">
        <div className="container">
          <h2 className="section-title">GitHub</h2>
          <div className="github-loading">
            <div className="spinner"></div>
            <p>Memuat data GitHub...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="github-section">
        <div className="container">
          <h2 className="section-title">GitHub</h2>
          <div className="github-error">
            <p>⚠️ {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="github" className="github-section">
      <div className="container">
        <h2 className="section-title">GitHub</h2>

        {/* Profile Card */}
        {user && (
          <div className="github-profile">
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              <img src={user.avatar_url} alt={user.login} className="github-avatar" />
            </a>
            <div className="github-info">
              <h3>{user.name || user.login}</h3>
              {user.bio && <p className="github-bio">{user.bio}</p>}
              <div className="github-stats">
                <div className="stat-item">
                  <span className="stat-value">{user.public_repos}</span>
                  <span className="stat-label">Repos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{user.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{user.following}</span>
                  <span className="stat-label">Following</span>
                </div>
              </div>
              <p className="github-joined">Bergabung {formatDate(user.created_at)}</p>
            </div>
          </div>
        )}

        {/* Repositories */}
        <h3 className="github-subtitle">Repositories</h3>
        <div className="github-repos">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
            >
              <div className="repo-header">
                <span className="repo-icon">📁</span>
                <span className="repo-name">{repo.name}</span>
              </div>
              {repo.description && <p className="repo-desc">{repo.description}</p>}
              <div className="repo-footer">
                {repo.language && (
                  <span className="repo-lang">
                    <span className="lang-dot" style={{ background: getLangColor(repo.language) }}></span>
                    {repo.language}
                  </span>
                )}
                <span className="repo-stat">⭐ {repo.stargazers_count}</span>
                <span className="repo-stat">🍴 {repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Contribution Graph */}
        <h3 className="github-subtitle">Kontribusi</h3>
        {/* <div className="contrib-graph">
          <div className="contrib-summary">
            <span>{getTotalContributions()} kontribusi dalam 16 minggu terakhir</span>
          </div>
          <div className="contrib-grid-wrapper">
            <div className="contrib-day-labels">
              <span></span>
              <span>Sen</span>
              <span></span>
              <span>Rab</span>
              <span></span>
              <span>Jum</span>
              <span></span>
            </div>
            <div className="contrib-grid">
              {getContributionWeeks().map((week, wi) => (
                <div key={wi} className="contrib-week">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      className="contrib-cell"
                      style={{ backgroundColor: getContribColor(day.count) }}
                      title={`${day.date}: ${day.count} kontribusi`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="contrib-legend">
            <span>Sedikit</span>
            <div className="legend-box" style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }} />
            <div className="legend-box" style={{ backgroundColor: 'rgba(102, 126, 234, 0.3)' }} />
            <div className="legend-box" style={{ backgroundColor: 'rgba(102, 126, 234, 0.5)' }} />
            <div className="legend-box" style={{ backgroundColor: 'rgba(102, 126, 234, 0.7)' }} />
            <div className="legend-box" style={{ backgroundColor: 'rgba(102, 126, 234, 0.95)' }} />
            <span>Banyak</span>
          </div>
        </div> */}

        {/* Recent Activity */}
        {events.length > 0 && (
          <>
            <h3 className="github-subtitle">Aktivitas Terbaru</h3>
            <div className="github-events">
              {events.slice(0, 6).map((event) => (
                <div key={event.id} className="event-item">
                  <span className="event-type">{getEventLabel(event.type)}</span>
                  <span className="event-repo">{event.repo.name.split('/')[1]}</span>
                  <span className="event-date">{formatDate(event.created_at)}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link-btn"
        >
          Lihat Profil GitHub →
        </a>
      </div>
    </section>
  )
}

export default GitHub
