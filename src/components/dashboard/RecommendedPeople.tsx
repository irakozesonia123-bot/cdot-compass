import { ContentGrid } from '@/components/layout/ContentGrid'
import { EmployeeCard } from '@/components/employee/EmployeeCard'
import { INTERN_PROFILE } from '@/config/internProfile'
import { recommendPeople } from '@/utils/recommendations'

/** People the intern might want to meet, based on their interests. */
export function RecommendedPeople() {
  const recs = recommendPeople(INTERN_PROFILE.interests, 3)
  return (
    <ContentGrid cols={3} animate>
      {recs.map((rec) => (
        <EmployeeCard key={rec.employee.id} employee={rec.employee} />
      ))}
    </ContentGrid>
  )
}
