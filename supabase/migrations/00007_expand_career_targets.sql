UPDATE public.profiles AS profile
SET career_targets = (
  SELECT COALESCE(
    jsonb_agg(to_jsonb(roles.target) ORDER BY roles.first_position),
    '[]'::jsonb
  )
  FROM (
    SELECT target, MIN(position) AS first_position
    FROM jsonb_array_elements_text(
      COALESCE(profile.career_targets, '[]'::jsonb) ||
      '[
        "Software Development Engineer",
        "Software Engineer",
        "Full Stack Developer",
        "Backend Developer",
        "Frontend Developer",
        "React.js Developer",
        "Node.js Developer",
        "Full Stack Software Engineer",
        "Backend Software Engineer",
        "Frontend Software Engineer"
      ]'::jsonb
    ) WITH ORDINALITY AS target_rows(target, position)
    GROUP BY target
  ) AS roles
)
WHERE id = 'gokul-chandel-profile';
