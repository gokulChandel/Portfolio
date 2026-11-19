UPDATE public.profiles
SET career_targets = COALESCE(
  (
    SELECT jsonb_agg(to_jsonb(role) ORDER BY position)
    FROM jsonb_array_elements_text(career_targets) WITH ORDINALITY AS roles(role, position)
    WHERE role NOT IN (
      'API Developer',
      'MERN Stack Developer',
      'Software Developer',
      'Associate Software Engineer',
      'Software Engineer I',
      'Full Stack Engineer',
      'Backend Engineer',
      'Frontend Engineer',
      'React Developer',
      'Node.js Backend Engineer',
      'Web Developer'
    )
  ),
  '[]'::jsonb
)
WHERE id = 'gokul-chandel-profile';
